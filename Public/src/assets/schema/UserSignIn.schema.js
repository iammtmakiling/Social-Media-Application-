import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().email('Please provide a valid email').required('Please put your email'),
    password: Yup.string().required('Please provide a password')
})