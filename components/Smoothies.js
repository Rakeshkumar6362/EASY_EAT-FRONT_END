import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

const Smoothies = ({
    setshowsmoothies =()=>{}
}) => {
    return (
        <Modal onRequestClose={()=>{
            setshowsmoothies(false)
        }}>
            <Text>Smooothies</Text>
        </Modal>
    )
}

export default Smoothies

const styles = StyleSheet.create({})
