// TODO: Add More Functions
declare function ExecSync(command: string): string
export namespace ChildProcess {
    export function execute(command: string): string {

        return ExecSync(command)

    }
}