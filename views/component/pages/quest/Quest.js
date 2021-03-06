import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pageActions from '../../../redux/action/index';
import QuestionBanner from './banner/banner';
import QuestionDescription from './description/description';
import QuestionTask from './task/task';
import QuestionComments from './comments/comments';

const mapStateToProps = state => ({questInfo: state.GetQuestInfo});
const mapDispatchToProps = dispatch => ({pageActions: bindActionCreators(pageActions, dispatch)});

@connect(mapStateToProps, mapDispatchToProps)
export default class Question extends React.Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        questInfo: React.PropTypes.object.isRequired,
        pageActions: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        const { GetQuestInfo, GetTasks } = this.props.pageActions;
        GetQuestInfo(this.props.params.id);
        GetTasks(this.props.params.id, false);
    }

    render() {
        const {questInfo, questTask, questFetching} = this.props.questInfo;

        if (questInfo === null) {
            return (
                <div className='error-message-page'>
                    {questFetching ? '' : null}
                    <h2>Такой квест пока что не создан</h2>
                </div>
            )
        }
        const questBlock = (
            <div>
                <QuestionBanner />
                <QuestionDescription id={questInfo.id} description={questInfo.description} title={questInfo.title}
                                     banner={questInfo.banner} author={questInfo.author} questId={this.props.params.id}/>
                <QuestionTask questTask={questTask}/>
                <QuestionComments questId={this.props.params.id}/>
            </div>
        );

        return (
            <main>
                {questFetching ? '' : questBlock}
            </main>
        );
    }
}
