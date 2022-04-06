import * as fs from "fs";
import * as path from "path";
import { emptyDir } from "fs-extra";
import { format } from 'prettier';
import chalk from "chalk";

const baseDir = path.resolve(__dirname, "../../xinxin-icons/packages");

function getSvgFilePathList(): string[] {
    const svgFiles = fs.readdirSync(path.join(baseDir, "svg"));
    return svgFiles.map(svgFile => path.join(baseDir, "svg", svgFile));
}

async function generateVueFile(filePath: string): Promise<void> {
    // 获取svg内容
    const svgContent = await fs.promises.readFile(filePath, 'utf-8');
    const componentName = path.basename(filePath).split(".")[0];
    const vueCode = format(`
        <template>
            ${svgContent}
        </template>
        <script lang="ts">
        import { defineComponent } from 'vue'
        export default defineComponent({
            name: "${componentName}",
        })
        </script>
    `, {
        parser: 'vue',
        semi: false,
        singleQuote: true,
    });
    // 写入到src目录下
    fs.promises.writeFile(path.join(baseDir, "src", `${componentName}.vue`), vueCode, 'utf-8');
}

function generateIndex(svgFullPathList: string[]): void {
    let importContent= '';
    let componentList = '';
    svgFullPathList.forEach(filePath => {
        let componentName = path.basename(filePath).split(".")[0];
        importContent += `
            import ${converName(componentName)} from "./src/${componentName}.vue";
        `;
        componentList += converName(componentName) + ',';
    });
    let fileContent = `
        import type { App } from "vue";
        ${importContent}

        const componentList = [
            ${componentList}
        ];

        const install: any = (app: App) => {
            componentList.forEach((component: any) => {
                if (component.install) {
                    // 执行每个组件的install方法
                    app.use(component);
                }
                app.component(component.name, component);
            });
        }

        export default {
            install,
        }
        
        export {
            ${componentList}
        }
    `;
    fileContent = format(fileContent, {
        parser: 'typescript',
        semi: false,
        singleQuote: true,
    });
    fs.promises.writeFile(path.join(baseDir, "main.ts"), fileContent, "utf-8");
}

function converName(componentName: string): string {
    let componentList = componentName.split("-");
    if (componentList.length <= 1) {
        return componentName.slice(0, 1).toUpperCase() + componentName.slice(1);
    }
    componentName = '';
    componentList.forEach(item => {
        componentName += item.slice(0, 1).toUpperCase() + item.slice(1);
    });
    return componentName;
}

(async () => {
    console.info(chalk.green("generate svg components start....."));
    await emptyDir(path.join(baseDir, "src"));
    const svgFullPathList = getSvgFilePathList();
    await Promise.all(svgFullPathList.map(svgFullPath => generateVueFile(svgFullPath)));
    console.info(chalk.green("generate svg components finish....."));
    // 生成index.ts
    console.info(chalk.green("generate index.ts start....."));
    generateIndex(svgFullPathList);
    console.info(chalk.green("generate index.ts finish....."));
})();

