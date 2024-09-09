import { Box,  Container, useColorModeValue} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import { RegisterSubmitButton } from './Button/RegisterSubmit';
import Header from './Header/Header';

const MainPage = () => {
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const hash = params.hash
    const bg = useColorModeValue("white", "neutral.900")

    return (
        <Box bg={bg}>
            <Header></Header>
            <Container size="ld">
                <Box gap="ms">
                    <Editor></Editor>
                </Box>
                <RegisterSubmitButton/>
            </Container>
        </Box>
    )
}

export default MainPage