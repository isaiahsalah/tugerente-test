import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { PostContext } from '../providers/PostProvider'
import { Appbar, Divider, Text } from 'react-native-paper'

export default function PostScreen({ navigation }) {
    const { post, setPost } = React.useContext(PostContext)

    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
                <Appbar.Content title={post.title} subtitle='Post del usuario' />
            </Appbar.Header>
            <View style={{ alignItems: 'center' }}>
                <Image style={{
                    borderRadius: 10,
                    margin: 12,
                    justifyContent: 'center',
                    width: Dimensions.get('window').width / 1.5,
                    height: Dimensions.get('window').width / 1.5,
                }} source={{ uri: post.url }} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ width: 0, textAlign: 'center' }}>.</Text>
                    <View style={{ flex: 1, height: 0.1, backgroundColor: 'grey', marginHorizontal: 12 }} />
                </View>
                <Text style={{ fontSize: 20, margin: 12, textAlign: 'center' }} children={post.title} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ width: 0, textAlign: 'center' }}>.</Text>
                    <View style={{ flex: 1, height: 0.1, backgroundColor: 'grey', marginHorizontal: 12 }} />
                </View>
                <Text style={{ fontSize: 13, color: 'grey', textAlign: 'center' }} children={post.body} />
            </View>
        </ScrollView>
    )
}