import React from 'react'
import { Appbar, List } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { urlApi, urlPhotos, urlPost } from '../utils/ApiData'
import { UserContext } from '../providers/UserProvider'
import { PostContext } from '../providers/PostProvider'


export default function ListScreen({ navigation }) {

    const { user, setUser } = React.useContext(UserContext)
    const { post, setPost } = React.useContext(PostContext)
    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        axios.get(urlApi + urlPhotos)
            .then((phot) => {
                axios.get(urlApi + urlPost + '?userId=' + user.id)
                    .then((re) => {
                        re.data.map((pst) => {
                            pst.thumbnailUrl = phot.data.find(dat => dat.id === pst.id).thumbnailUrl
                            pst.url = phot.data.find(dat => dat.id === pst.id).url
                            return pst
                        })
                        return setPosts(re.data)
                    })
                    .catch((e) => { console.log(e) })
            })
            .catch((e) => { console.log(e) })
    }, [])

    const onPressPost = (pst) => {
        setPost(pst);
        navigation.push('post')
    }

    return (
        <KeyboardAwareScrollView>
            <Appbar.Header>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
                <Appbar.Content title={user.name} subtitle='Lista de post del usuario' />
            </Appbar.Header>
            {posts.length > 0 ? posts.map((dat) => (
                <List.Item
                    onPress={() => onPressPost(dat)}
                    key={dat.id}
                    title={"Title: " + dat.title}
                    description={"Body: " + dat.body}
                    right={props => <List.Icon {...props} icon="arrow-right" />}
                    left={props => <List.Image {...props} variant="image"
                        source={{ uri: dat.thumbnailUrl }} />}
                />
            )) : null}

        </KeyboardAwareScrollView>
    )
}