import { HttpCode } from "../common/types/error.enum"

function AppError (message: string, code: HttpCode) {
    return {
        message,
        code,
    }
}

export default AppError