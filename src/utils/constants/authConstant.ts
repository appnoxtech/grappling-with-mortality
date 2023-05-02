export const LandingPageBtnLabels = {
    Login: 'Login',
    Register: 'Register',
}

export const LoginHeading = {
    primaryHeading: 'Welcome Back!',
    remember: 'Remember Password',
    forget: 'Forget Password?',
    orLoginWith: 'or Login with',
}

export const RegisterHeading = {
    primaryHeading: 'Create Account',
    remember: 'Remember Password',
    forget: 'Forget Password?',
    orRegisterWith: 'or Register with',

}


export const LoginInputsInitialState = {
    email: '',
    password: '',
}

export const RegisterInitialState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassowrd: ''
}

export const ErrorMessage = {
    PSWD_NOT_MATCH: 'Password not match.',
    PSWD_LENGTH: 'Password length must be greater then 5.',
    PSWD_REQ: 'Passowrd is required !',
    INVD_EMAIL: 'Please enter a valid email.',
    EMAIL_REQ: 'Email is required !',
    REQ: 'Required !'
}

export const SuccessMessage = {
    signUp: 'SuccessFully Sign up'
}

export const inputsConstant = {
    fullName: {
      id: "fullName",
      iconFamily: "FontAwesome5",
      iconName: "user-circle",
      iconSize: 20,
      placeholder: "Full Name"
    },
     email: {
       id: "email",
       iconFamily: "MaterialCommunityIcons",
       iconName: "email",
       placeHolder: "Email",
       iconSize: 20
     },
     password: {
       id: "password",
       iconFamily: "FontAwesome",
       iconName: "lock",
       placeHolder: "Password",
       iconSize: 20
     },
     confirmPassword: {
        id: "confirmPassowrd",
        iconFamily: 'FontAwesome',
        iconName: 'lock',
        iconSize: 20,
        placeholder: 'Confirm Password'
     }
  }