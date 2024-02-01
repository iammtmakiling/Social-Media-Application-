import * as Yup from 'yup';

export default Yup.object({
    firstName : Yup.string().required('Please put a First Name.'),
    lastName : Yup.string().required('Please put a Last Name.'),
    email : Yup.string().email('Please put a valid email.').required('Please provide an email.').min(6),
    password : Yup.string().required('Please provide a password.'),
    confirmPassword: Yup.string().required("Please confirm your password.").min(6).test('passwords-match', 'Passwords did not match', function (value) {
        return this.parent.password === value;
    }),
})