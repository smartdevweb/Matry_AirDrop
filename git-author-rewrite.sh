#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="supernathanliu@gmail.com"
CORRECT_NAME="erichahn0714"
CORRECT_EMAIL="cryptofantasy.dev@gmail.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_NAME" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
