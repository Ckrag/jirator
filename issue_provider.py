from jira import JIRA
import json

# Notes:
# References: https://confluence.atlassian.com/jiracoreserver071/advanced-searching-fields-reference-802172572.html
# Python references: https://pythonhosted.org/jira/#id26
# Build queries https://tv2cms.atlassian.net/browse/WSPG-4?jql=
# Decode: http://meyerweb.com/eric/tools/dencoder/
# Help: https://answers.atlassian.com/questions/topics/754366/jira-python

USERNAME = ''
PASSWORD = ''

class IssueProvider(object):

    @staticmethod
    def get_data():
        jira = JIRA(server='https://tv2cms.atlassian.net', basic_auth=(USERNAME, PASSWORD))
        issues = jira.search_issues(
            'project in (NYA, SPORTAND, TTAND, APPBACK, VEJRAND) AND status in ("In Review", Open, "In Development") AND due <= 50w',
            maxResults=50, startAt=0)

        issue_list = []

        for issue in issues:

            issue_list.append(
                {
                    "summary" : issue.fields.summary,
                    "description" : issue.fields.description,
                    "due_date" : issue.raw["fields"]["duedate"],
                    "assignee" : issue.fields.assignee.name,
                    "reporter" : issue.fields.reporter.name,
                    "status" : issue.fields.status.name
                }
            )

        return json.dumps(issue_list)