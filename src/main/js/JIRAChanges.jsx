import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table } from '@jenkins-cd/design-language';

class IssueLink extends Component {
    render() {
        var url = this.props.serverURL + '/browse/' + this.props.issue.key;
        return (<a href={url}>{this.props.children}</a>);
    }
}

export default class Issues extends Component {

    constructor(props) {
        super(props);
        this.run = props.run;
    }

    render() {
        const headers = [
            { label: 'Key', className: 'issueKey' },
            { label: 'Summary', className: 'issueSummary' },
        ];
        var actions = this.props.result.actions.filter(action => action._class == 'hudson.plugins.jira.JiraBuildAction');
        var action = actions.length > 0 && actions[0];
        var issues = actions.length > 0 && actions[0].issues;
        var serverURL = actions.length > 0 && actions[0].serverURL;
        if (issues) {
            return (
                <div>
                    <h3>JIRA Issues</h3>
                    <Table headers={headers} className="issues-table fixed">
                        { issues.map(issue => (
                            <tr key={issue.key}>
                                <td><IssueLink serverURL={serverURL} issue={issue}>{issue.key}</IssueLink></td>
                                <td><IssueLink serverURL={serverURL} issue={issue}>{issue.summary}</IssueLink></td>
                            </tr>
                        ))}
                    </Table>
                    <h3>Commits</h3>
                </div>
            );
        } else {
            return (<h1>No JIRA</h1>);
        }
    }
}

Issues.propTypes = {
    run: PropTypes.object,
};
