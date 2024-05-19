import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';
import Calendar_board_module from './calendar.board.module.scss';

const mockData = [
    {
        "slot": {
            "sessionId": "bd299248-dc61-44de-9258-56c33ae0ec58",
            "serviceId": "fd9d0ea6-642b-490b-a0a0-318b8ebf5fc7",
            "scheduleId": "e28d042c-c478-47d5-bd4e-f56de9acd5d2",
            "startDate": "2024-05-16T20:21:27.649Z",
            "endDate": "2024-05-16T21:21:27.649Z"
        },
        "bookable": true,
        "isFromV2": false,
        "locked": false,
        "openSpots": 15,
        "totalSpots": 15,
        "waitingList": {}
    },
    {
        "slot": {
            "sessionId": "ab3ccb79-db0b-4000-a8bc-b3a7e6d6b198",
            "serviceId": "fd9d0ea6-642b-490b-a0a0-318b8ebf5fc7",
            "scheduleId": "7baa8707-0cb0-4b1f-a8e7-72af7c356c1a",
            "startDate": "2024-05-17T22:04:04.446Z",
            "endDate": "2024-05-17T23:04:04.446Z"
        },
        "bookable": true,
        "isFromV2": false,
        "locked": false,
        "openSpots": 15,
        "totalSpots": 15,
        "waitingList": {}
    },
    {
        "slot": {
            "sessionId": "83972fd0-e224-4cff-aef2-cf6c183e1ee6",
            "serviceId": "fd9d0ea6-642b-490b-a0a0-318b8ebf5fc7",
            "scheduleId": "a8a6502a-7248-458f-bb74-a658f5a53213",
            "startDate": "2024-05-20T02:55:29.458Z",
            "endDate": "2024-05-20T03:55:29.458Z"
        },
        "bookable": true,
        "isFromV2": false,
        "locked": false,
        "openSpots": 15,
        "totalSpots": 15,
        "waitingList": {}
    }
]


export default createBoard({
    name: 'Calendar',


    Board: () => {

          <ComponentWrapper settings={{}}>
            <ContentSlot>
                <div className={Calendar_board_module.heyyyy}>
                    <Calendar data = {mockData} />
                </div>
            </ContentSlot>
        </ComponentWrapper>
    },

    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 1888,
        windowHeight: 1368,
    },
});
