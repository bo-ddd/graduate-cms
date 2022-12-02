// MessageProps 是提示信息的数据的类型
export default interface MessageProps {
    message: string,
    type: "warning" | "success" | "info" | "error"
}