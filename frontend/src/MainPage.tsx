import { Box,  Center,  Container, Heading} from '@yamada-ui/react';
import { useParams } from 'react-router-dom';
import Editor from './Editor/Editor';
import { ExpirationPulldown } from './Pulldown/Expiration';
import { RegisterSubmit } from './Button/RegisterSubmit';
import { ColorModeButton } from './Button/ColorModeButton';
import Header from './Header/Header';

const MainPage = () => {
    // URLパラメータからハッシュ値を取得
    const params = useParams<{ hash?: string}>()
    const hash = params.hash

    return (
        <>
        <Header></Header>
            <Container size="ld">
                <Center>
                    <Heading>Snippet Sharing Service(SSS(仮))</Heading>
                </Center>
                <Box gap="ms">
                    <Editor></Editor>
                </Box>

                <ExpirationPulldown/>
                <RegisterSubmit/>
                <ColorModeButton/>
            </Container>
        </>
    )
}

export default MainPage