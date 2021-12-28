import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

const IceCream = ({
    route,
    setshowIcecream=()=>{}
}) => {
    return (
        <Modal onRequestClose={()=>setshowIcecream(false)}>
            <Text>Ice Cream</Text>
            <Text>{route.params.name}</Text>
        </Modal>
    )
}

export default IceCream

const styles = StyleSheet.create({})
