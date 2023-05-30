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
    PSWD_LENGTH: 'Password length must be of 5 digits.',
    PSWD_SUGGESTION: 'Password must contain atleast 5 alphabets, 1 Uppercase, 1 Lowercase, 1 Special Chanracter and 1 digit.',
    PSWD_FIVE_ALPHABET: 'Password must contain at least 5 Alphabets',
    PSWD_REQ: 'Password is required !',
    INVD_EMAIL: 'Please enter a valid email.',
    EMAIL_REQ: 'Email is required !',
    REQ: 'Required !'
}

export const SuccessMessage = {
    signUp: 'Successfully Sign up'
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
     oldPassword: {
        id: "oldPassword",
        iconFamily: "FontAwesome",
        iconName: "lock",
        placeHolder: "Old Password",
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