import { userSettingKey } from "./Definitions"

export const loadingUserSettingData = () => {
    const data = localStorage.getItem(userSettingKey)
    if (data) {
        // todo: ユーザー情報をローディングして、必要なstateにセットする処理を書く
        // todo: jsonをパースする
        // todo: 言語を取得してstateにセット
        // todo: テーマを取得してstateにセット
        // todo: editorの設定を取得して、stateにセット
        return 
    }
}