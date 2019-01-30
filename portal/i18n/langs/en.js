const cn = require('./cn')
const merge = require('merge')
const en = {
    login: {
        pass: {
            title: 'password login',
            input: [
                'please enter user name',
                'please enter your password',
            ],
            btn: [
                'log in',
                'sms quick login'
            ],
            error: [
                'username can not be empty',
                'password can not be blank',
                'login failed'
            ]
        },
        sms: {
            title: 'sms verification',
            input: [
                'please enter mobile number',
                'please enter verification code'
            ],
            btn: [
                'click for get code',
                'log in',
                'user account login'
            ]
        },
        authCode: {
            input: [
                'please enter verification code'
            ],
            btn: [
                'verification',
            ],
            message: [
                'login failed, please enter the verification code',
                'verification code input errors, please re-enter',
                'please enter verification code',
                'successful verification, please login',
                'click for get code'

            ]
        },
        copyright: 'Copyright © 2018 Belle International'
    },
    main: {
        tabs: [
            'open at the same time',
            'a tab',
            'prompt',
            'determine'
        ],
        logs: 'log',
        index: 'Home',
        noVer: 'no version',
        langswitch: 'language switch',
        message: 'viewing history',
        notice: 'view more',
        createTime:"create time:",
        creator:"creator:",
        unread: 'unread',
        read: 'read',
        lang: [
            'simplified',
            'traditional',
            'english'
        ],
        option: [
            'full screen',
            'reduction',
            'close other'
        ],
        search: 'menu search',
        news: [
            'announcement',
            'message'
        ],
        list: [
            'personal center',
            'change password',
            'settings',
            'drop out',
            'replace avatar'
        ],
        loginout: [
            'do you quit the system? ',
            'logout tip',
            'determine',
            'cancel'
        ]
    },
    user: {
        title: 'personal basic information',
        msg: 'submit data successfully!',
        imgMsg: 'replace the image successfully',
        imgTips: 'please put the cursor on the picture.',
        uperror: [
            'upload avatar images can only be in jpg format!',
            `upload avatar image size can't exceed 2mb!`
        ],
        input: [
            'log-in name',
            'user name',
            'cell phone',
            'mailbox',
            'avatar upload'
        ],
        validate: [
            'please enter your login name',
            'please enter a username',
            'please enter the phone number',
            'please input your email',
            'Please enter the correct mobile phone number.',
            'Please enter the correct format of email address.'
        ],
        btn: [
            'submit',
            'cancel'
        ]
    },
    pass: {
        title: 'password modification',
        msg: 'the content has changed, is it confirmed to quit?',
        msg2: 'password modified successfully!',
        input: [
            'old password',
            'new password',
            'confirm password'
        ],
        des: [
            'password must contain uppercase and lowercase letters, numbers and symbols (no space characters)!',
            'please enter the password you want to change! the passwords entered twice are inconsistent! the password must contain uppercase and lowercase letters, numbers and symbols (no space characters)!'
        ],
        btn: [
            'submit',
            'reset'
        ],
        validate: [
            'this is required!',
            'the new password is greater than 6!',
            'the new password must contain english and numbers!'
        ],
        validate2: [
            'this is required!',
            'two input passwords are inconsistent!'
        ]
    }

}

export default merge(en, cn)
