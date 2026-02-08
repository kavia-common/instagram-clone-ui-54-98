#!/bin/bash
cd /home/kavia/workspace/code-generation/instagram-clone-ui-54-98/frontend_instagram_clone
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

