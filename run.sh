echo "-------> INIT SOURCE"
source ~/.profile

echo "-------> FOREVER STOP SOCIAL"
forever stop social

echo "-------> UPDATE SOCIAL FROM GIT..."
git pull

echo "-------> UPDATE SOCIAL FROM NPM..."
npm update

echo "-------> RESTART SOCIAL"
forever --uid "social" --append start -c "node --harmony" app.js