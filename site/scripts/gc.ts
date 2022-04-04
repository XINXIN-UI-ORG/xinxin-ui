import * as path from "path";
import * as fs from "fs";
import { format } from "prettier";

/**
 * 读取../src/components/examples下所有目录
 * 循环读取目录下的文件并组装到当前目录的Index.vue文件内
 * 在../src/components/examples内的index.ts导出文件
 */
const baseDir = path.resolve(__dirname, "../src/components/examples");

enum ExampleDisplaySide {
    left,
    right
};

type Result = {
    import: string,
    setupReturn: string,
    codeDisplayLeft: string,
    codeDisplayRight: string
};

function toLowName(upperName: string): string {
    return upperName[0].toLowerCase() + upperName.substring(1, upperName.length);
}

function getPureName(name: string): string {
    for (let i = 0; i < name.length; i++) {
        if (!/[0-9]/g.test(name[i])) {
            return name.substring(i, name.length);
        }
    }
    return name;
}

function singleExample(examplesPath: string, exampleName: string, side: ExampleDisplaySide, result: Result): void {
    let pureExampleName = getPureName(exampleName);
    // 获取vue组件下的内容
    let codeContent: string = fs.readFileSync(path.join(examplesPath, exampleName + ".vue"), 'utf-8');
    // 生成import内容
    result.import += `
        import ${pureExampleName} from "./${exampleName}.vue";
    `;
    // 生成setup函数返回的内容
    result.setupReturn += `
        ${pureExampleName},
        ${toLowName(pureExampleName)}Info: info.${toLowName(pureExampleName)},
    `;
    // 生成代码区域
    const codeDisplay = `
        <CodeExample
            id="${toLowName(pureExampleName)}"
            code='${codeContent}'
            :title="${toLowName(pureExampleName)}Info.title"
            :code-v-node="${pureExampleName}"
            :code-desc="${toLowName(pureExampleName)}Info.desc">
        </CodeExample>
    `;
    if (side === ExampleDisplaySide.left) {
        result.codeDisplayLeft += codeDisplay;
    } else {
        result.codeDisplayRight += codeDisplay;
    }
}

function compositionIndex(result: Result, filePath: string): void {
    let indexContent: string = `
        <script lang="ts">
        import { defineComponent } from 'vue';
        import Layout from "../../PublicComponent/Layout.vue";
        import CodeExample from "../../PublicComponent/CodeExample.vue";
        import Table from "../../PublicComponent/Table.vue";
        import * as info from "./info";
        ${result.import}
        
        export default defineComponent({
            setup() {
                return {
                    ${result.setupReturn}
                    apiProps: info.apiProps,
                    apiEvent: info.apiEvent,
                };
            },
            components: {
                Layout,
                CodeExample,
                Table,
            },
        })
        </script>
        <template>
            <Layout>
                <template #left>
                    ${result.codeDisplayLeft}
                </template>
                <template #right>
                    ${result.codeDisplayRight}
                </template>
            </Layout>
            <Table :api-event="apiEvent" :api-props="apiProps" />
        </template>
    `;
    indexContent = format(indexContent, {
        parser: 'vue',
        semi: false,
        singleQuote: true
    });
    // 写入文件中
    fs.promises.writeFile(filePath, indexContent, 'utf-8');
}

function dealWithComponent(componentFullPath: string): void {
    // 获取该路径下所有文件
    const files: string[] = fs.readdirSync(componentFullPath).filter(item => item !== "Index.vue" && item !== "info.ts");
    // 获取所有的示例名
    const fileWithoutSuffix: string[] = files.map(item => item.split(".")[0]);
    // 保存结果
    const result: Result = {
        import: '',
        setupReturn: '',
        codeDisplayLeft: '',
        codeDisplayRight: ''
    };
    // 处理单个示例
    fileWithoutSuffix.forEach((item, index) => {
        singleExample(componentFullPath, item, index % 2 === 0 ? ExampleDisplaySide.left : ExampleDisplaySide.right, result);
    });
    // 组织Index.vue文件内容
    compositionIndex(result, path.join(componentFullPath, "Index.vue"));
}

(async () => {
    // 读取改路径下所有的目录
    const dirs: string[] = fs.readdirSync(baseDir).filter(item => item !== "index.ts" && item !== "example.typing.ts");
    let indexImport: string = '';
    let indexExport: string = '';
    dirs.forEach(dir => {
        const currentComponentDir = path.join(baseDir, dir);
        dealWithComponent(currentComponentDir);
        // 获取导出内容
        indexImport += `import ${dir} from "./${dir}/Index.vue";\n`;
        indexExport += `${dir},\n`;
    });
    let indexContent = `
        ${indexImport}

        export {
            ${indexExport}
        }
    `;
    // 格式化代码
    indexContent = format(indexContent, {
        parser: 'typescript',
        semi: false,
        singleQuote: true
    });
    // 写入index.ts将所有演示组件导出
    fs.promises.writeFile(path.join(baseDir, 'index.ts'), indexContent, 'utf-8');
})();



