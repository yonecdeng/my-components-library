import { watch } from 'vue';
import usePopupQueue from '../index';
import FirstPopup from './popups/FirstPopup.vue';
import SecondPopup from './popups/SecondPopup.vue';
import ThirdPopup from './popups/ThirdPopup.vue';
export enum PopupTypes {
  THE_FIRST_TIME_ENTER_REMIND_CERTIFICATION_POPUP, // 首次进入页面提醒认证弹,
  RULE_SHOW_POPUP, // 规则展示弹窗
  GUIDE_TO_OPEN_PUSH_POPUP // 引导开通push弹窗
}

const popupsConfig = {
  [PopupTypes.GUIDE_TO_OPEN_PUSH_POPUP]: {
    type: PopupTypes.GUIDE_TO_OPEN_PUSH_POPUP,
    component: FirstPopup,
    priority: 3 // 优先级最高
  },
  [PopupTypes.THE_FIRST_TIME_ENTER_REMIND_CERTIFICATION_POPUP]: {
    type: PopupTypes.THE_FIRST_TIME_ENTER_REMIND_CERTIFICATION_POPUP,
    component: SecondPopup,
    priority: 2
  },
  [PopupTypes.RULE_SHOW_POPUP]: {
    type: PopupTypes.RULE_SHOW_POPUP,
    component: ThirdPopup,
    priority: 1
  }
};

const events = {
  onQueueEmpty: () => {
    console.log('onQueueEmpty');
  }
};
const { pushPopup, currentPopup, closeCurrentPopup, showNextPopup } =
  usePopupQueue(popupsConfig, events);

// popupList应该是从后端获取的
const popupList = [
  {
    // 中奖弹窗
    type: 'CyberCollegeGotAwardPopupResponse',
    title: '恭喜你中奖啦！',
    subTitle: '恭喜抽中奖学金',
    amount: '1000',
    button: {
      text: '开心收下',
      bubble: 'sting',
      linkType: 15,
      linkUrl: '',
      canClick: true
    },
    buttonDesc: '奖励已存入「钱包」'
  },
  {
    // 没有中奖弹窗
    type: 'CyberCollegeNoAwardPopupResponse',
    title: '差一点就中奖了～',
    subTitle: '音乐学院 张**抽中奖学金',
    amount: '1000',
    button: {
      text: '继续看视频抽奖学金',
      bubble: '',
      linkType: 10,
      linkUrl: '',
      canClick: true
    },
    buttonDesc: '永不言弃，好运继续'
  },

  {
    // 邀请奖励弹窗
    type: 'CyberCollegeInviteAwardPopupResponse',
    title: '',
    subTitle: '恭喜获得奖励',
    amount: '1000',
    button: {
      text: '提醒同学认证',
      bubble: '',
      linkType: 5,
      linkUrl: '',
      canClick: true
    },
    buttonDesc: '奖励已存入「钱包」',
    awardTips: '他们完成学生认证，你再得<span>5元</span>',
    recordList: [
      {
        headUrlList: [
          'https://p2.a.yximgs.com/uhead/AB/2020/09/03/12/BMjAyMDA5MDMxMjUyMzFfOTAwNDFfMl9oZDI1OF83NzE=_s.jpg',
          'https://p4.a.yximgs.com/uhead/AB/2020/04/20/14/BMjAyMDA0MjAxNDA5MzhfMTAxODk4MTQ3Nl8yX2hkNTBfNjQ2_s.jpg',
          'https://p2.a.yximgs.com/uhead/AB/2022/03/28/14/BMjAyMjAzMjgxNDQwNTNfMTIwNTczMjA5M18yX2hkODUxXzc5OQ==_s.jpg'
        ],
        desc: '成功邀请了3名同学'
      }
    ]
  }
];

// watch(popupList, () => { // 这里是示例，正常项目中popupList应该由后端返回，所以应该用watch
popupList.forEach((popup) => {
  switch (popup.type) {
    case 'CyberCollegeGotAwardPopupResponse':
      pushPopup({
        type: PopupTypes.GUIDE_TO_OPEN_PUSH_POPUP,
        data: {
          ...popup
        }
      });
      break;
    case 'CyberCollegeNoAwardPopupResponse':
      pushPopup({
        type: PopupTypes.THE_FIRST_TIME_ENTER_REMIND_CERTIFICATION_POPUP,
        data: {
          ...popup
        }
      });
      break;
    case 'CyberCollegeInviteAwardPopupResponse':
      pushPopup({
        type: PopupTypes.RULE_SHOW_POPUP,
        data: {
          ...popup
        }
      });
      break;
    default:
      break;
  }
});
// });

export { pushPopup, currentPopup, closeCurrentPopup, showNextPopup };
