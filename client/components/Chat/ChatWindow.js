// import React, { Component } from 'react';
// import { Launcher } from 'react-chat-window';

// class ChatWindow extends Component {
//   constructor() {
//     super();
//     this.state = {
//       messageList: [],
//       isOpen: true,
//     };
//   }

//   _onMessageWasSent(message) {
//     this.setState({
//       messageList: [...this.state.messageList, message],
//     });
//   }

//   _sendMessage(text) {
//     if (text.length > 0) {
//       this.setState({
//         messageList: [
//           ...this.state.messageList,
//           {
//             author: 'them',
//             type: 'text',
//             data: { text },
//           },
//         ],
//       });
//     }
//   }

//   componentDidMount() {
//     console.log(this.props);
//   }

//   render() {
//     return (
//       <div>
//         <Launcher
//           agentProfile={{
//             teamName: 'react-chat-window',
//             imageUrl:
//               'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
//           }}
//           onMessageWasSent={this._onMessageWasSent.bind(this)}
//           messageList={this.state.messageList}
//           showEmoji
//           isOpen={true}
//         />
//       </div>
//     );
//   }
// }

// export default ChatWindow;
