import React from 'react';

function JiraServiceDeskLink() {
  return (
    <li className="link">
      <a id="issue-collector-btn" href="https://connorsgroup.atlassian.net/servicedesk/customer/portal/9" target="_blank">
        <div className="content">
          <i className="fa fa-bullhorn icon" />
          <span className="text">Feedback</span>
        </div>
      </a>
    </li>
  );
}

export default JiraServiceDeskLink;

