import { MEMBER_DATA, MEMBER_ACCOUNT } from '../actions/dataAction';

let initialState = {
    account: [
        {
            id: 77,
            username: 'a',
            password: 'a',
            role: 'mimin'
        },
        {
            id: 66,
            username: 'b',
            password: 'b'
        }
    ]
    ,
    member: [
        {
            id: 1,
            nama: "Angga Permana",
            motto: "To get what you love, you must be patient with what you hate.",
            photoUrl: "https://www.tortazabazar.com/adminelite/user.png",
            gitUrl: "https://github.com/an66a",
        },
        {
            id: 2,
            nama: "Yoseph Mario Wibowo",
            motto: "harapkan yang tak terduga",
            photoUrl: "https://www.tortazabazar.com/adminelite/user.png",
            gitUrl: "https://github.com/an66a/bcamp",
        },
        {
            id: 3,
            nama: "Asep Agus Heri Hermawan",
            motto: "He who didn't taste the bitterness of learning, will suffer the humiliation of ignorance for the rest of his life",
            photoUrl: "https://firebasestorage.googleapis.com/v0/b/react-enc.appspot.com/o/img%2FAsep%20Agus%20Heri%20Hermawan.jpg?alt=media&token=f7a83247-82ba-4179-ab97-fd17406bd39f",
            gitUrl: "https://github.com/asep10001",
        },
        {
            id: 4,
            nama: "Rifki Harbi Awali",
            motto: "harapkan yang tak terduga",
            photoUrl: "https://www.tortazabazar.com/adminelite/user.png",
            gitUrl: "https://github.com/an66a/bcamp",
        },
        {
            id: 5,
            nama: "Fajar Syifaul Haq",
            motto: "harapkan yang tak terduga",
            photoUrl: "https://www.tortazabazar.com/adminelite/user.png",
            gitUrl: "https://github.com/an66a/bcamp",
        },
        {
            id: 6,
            nama: "Gilbert Subay",
            motto: "harapkan yang tak terduga",
            photoUrl: "https://www.tortazabazar.com/adminelite/user.png",
            gitUrl: "https://github.com/an66a/bcamp",
        },
        {
            id: 7,
            nama: "Dian Prasetyo",
            motto: "Sabar, ikhlas, Bersyukur",
            photoUrl: "https://firebasestorage.googleapis.com/v0/b/react-enc.appspot.com/o/img%2FDian%20Prasetyo.jpg?alt=media&token=24e8fc38-db9b-49dc-b502-7210cc86720e",
            gitUrl: "https://github.com/dianprsty",
        },
        {
            id: 8,
            nama: "Dian Prasetyo",
            motto: "Sabar, ikhlas, Bersyukur",
            photoUrl: "https://firebasestorage.googleapis.com/v0/b/react-enc.appspot.com/o/img%2FPramadhio%20Ari%20Putro.jpg?alt=media&token=9d307baf-04dd-4246-96b4-1e54e9b6a438",
            gitUrl: "https://github.com/dianprsty",

        }
    ]
}

const member = (state = initialState, action) => {
    switch (action.type) {
        case MEMBER_DATA:
            return {
                ...state,
                member: action.payload.data,
            }
        case MEMBER_ACCOUNT:
            return {
                ...state,
                account: action.payload.data,
            }
        default:
            return state
    }
}
export default member