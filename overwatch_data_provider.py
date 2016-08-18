import sys
import issue_provider
# parsed params
# sys.argv[0] contains the requested url
# http://stackoverflow.com/a/30664497

# Print the data you want to return
def main(arg):
    json = issue_provider.IssueProvider.get_data()

    response = "jsonpCallback({0})".format(json)

    print(response)

if __name__ == "__main__":
    main(sys.argv[1])