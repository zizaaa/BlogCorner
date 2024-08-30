import React from 'react'
import { ShareSocial } from 'react-share-social' 
import { SocialButtonsProps } from '../../types/Props'

const ShareSocialButton:React.FC<SocialButtonsProps> =(props)=> {
    const style = {
        root: {
            background: 'transparent',
            with:'100%',
            color: 'white',
            padding:'0px'
        },
        copyContainer: {
            background: 'black'
        },
        copyIcon:{
            color:'white'
        },
        iconContainer:{
            padding:'0',
            marginBottom:'15px'
        }
    };

    return <ShareSocial 
        url ={`${props.url}`}
        socialTypes={['facebook','twitter','reddit','linkedin']}
        style={style}
    />
}

export default ShareSocialButton