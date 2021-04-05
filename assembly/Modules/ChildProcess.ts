// TODO: Add More Functions
declare function ExecSync(command: string): string
declare function Exec(command: string, pointer: i32): void
export namespace ChildProcess {
    export function exec(command: string, callback: (stdout: string) => void): void {

        Exec(command, load<i32>(changetype<usize>(callback)))

    }
    export function execSync(command: string): string {

        return ExecSync(command)

    }
}