import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, BottomNavigation, Button, List, TextInput, Snackbar } from 'react-native-paper'
import { UserContext } from '../providers/UserProvider'
import axios from 'axios'
import { urlApi, urlUser } from '../utils/ApiData'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function HomeScreen({ navigation }) {

    const { user, setUser } = React.useContext(UserContext)
    const [users, setUsers] = React.useState([])
    const [email, setEmail] = React.useState('')

    React.useEffect(() => {
        axios.get(urlApi + urlUser)
            .then((re) => {
                if (email === '') return setUsers([])
                var response = re.data.filter((dataUser) => {
                    if (dataUser.email.includes(email)) return dataUser
                })
                setUsers(response)
            }).catch((e) => { console.log(e) })
    }, [email])

    const onPressUser = (dat) => {
        setUser(dat);
        setEmail(dat.email)
    }
    const onPressIngresar = () => {
        var existe = false
        existe = users.find(x => x.email === email)
        if (existe) navigation.push('list')
        else onToggleSnackBar('Selecciona un usuario.')
    }


    const [snackbar, setSnackbar] = React.useState({
        message: '',
        visible: false
    });
    const onToggleSnackBar = (message) => setSnackbar({ ...snackbar, visible: true, message: message });

    const onDismissSnackBar = () => setSnackbar({ ...snackbar, visible: false });

    return (

        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title='Home' subtitle='Busca al usuario con su correo' />
            </Appbar.Header>

            <TextInput style={{ margin: 12 }}
                label="Email"
                keyboardType='email-address'
                value={email}
                onChangeText={text => { setEmail(text) }}
                right={<TextInput.Icon icon="email-search" />}
            />
            {users ? users.map((dat) => (
                <List.Item
                    onPress={() => onPressUser(dat)}
                    key={dat.id}
                    title={"User: " + dat.username}
                    description={
                        "Name: " + dat.name
                        + "\n" +
                        "Email: " + dat.email
                    }
                />
            )) : null}
            <Button style={{ marginHorizontal: 12, position: 'relative', }} children={'Ingresar'} mode='contained' onPress={onPressIngresar} />
            
            <Snackbar
                visible={snackbar.visible}
                duration={2000}
                children={snackbar.message}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'ok',
                    onPress: () => { },
                }} />
        </View>
    )
}