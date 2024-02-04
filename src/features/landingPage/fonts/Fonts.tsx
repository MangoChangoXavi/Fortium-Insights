import { Poppins, Roboto } from 'next/font/google';
// import { GeistSans } from 'geist/font/sans';


export const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight:['400'],
    variable:'--roboto-font'
})
   
export const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight:['500'],
    variable:'--poppins-font'
})