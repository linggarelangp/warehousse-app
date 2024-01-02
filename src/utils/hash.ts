import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
    const hashed = await bcrypt.hash(password, 10)

    return hashed
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hash)

    return result
}