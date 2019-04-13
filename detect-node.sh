NODEVERSION=$(cat .nvmrc 2>/dev/null)

if [ -z $NODEVERSION ]
then
  touch .nvmrc
  echo 'v10.15.3' > .nvmrc
  echo ".nvmrc file created"
  echo "open it and specify the right node version for this project"
  echo "example v10.15.3"
  echo "And re-run this script"
  exit 1
fi

NODEBINDIR=$(find $HOME 2>/dev/null | grep node-$NODEVERSION-linux-x64/bin |  head -n 1)

if [ -z $NODEBINDIR ]
then
  echo "Node executables not found"
  echo "Please download version $NODEVERSION from:"
  echo "https://nodejs.org/dist/"
  echo "And put them into under your home folder, where you prefer"
  exit 1
fi

echo "Node executables found in dir:"
echo "$NODEBINDIR"
echo ""
echo "Add to PATH var with the following command:"
echo "export PATH=$PATH:$NODEBINDIR"
echo ""
