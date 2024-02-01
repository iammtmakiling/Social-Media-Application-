import * as Yup from 'yup';

export default Yup.object({
    //createdAt: Yup.date(),
    //createdBy: Yup.string(),
    content: Yup.string().required()
})