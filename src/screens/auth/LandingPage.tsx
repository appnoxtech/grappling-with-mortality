import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LandingPageHeader from '../../components/auth/Header'
import { LandingPageBtnLabels } from '../../utils/constants/authConstant'
import Login from '../../components/auth/Login'
import Register from '../../components/auth/Register'
const LandingPage = () => {
  const [activeLabel, setActiveLabel] = useState(LandingPageBtnLabels.Login);
  const handleLabelClick = (label: string) => {
    setActiveLabel(label);
  };
  return (
    <View style={styles.container}>
       <LandingPageHeader activeLabel={activeLabel} handleLabelClick={handleLabelClick} />
       {
          activeLabel === LandingPageBtnLabels.Login ? <Login /> : <Register />
       }
    </View>
  )
}

export default LandingPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})