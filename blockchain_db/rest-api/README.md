# Setting Up REST API

This will give the steps configuring REST API for already deployed blockchain network.

1. Setup composer-playground locally
    * https://hyperledger.github.io/composer/installing/development-tools.html


2. Create Business Network:  Will generate .bna file for the developed network
    * https://hyperledger.github.io/composer/business-network/bnd-create.html

3. Deploy Network Locally: Use Generated .bna file to deploy network locally
    * https://hyperledger.github.io/composer/business-network/bnd-deploy.html

    ```
    composer network deploy -p hlfv1 -a auction-network.bna -i PeerAdmin -s adminpwd -A admin -S
    ```

4. Create REST Server for Running Network
    * https://hyperledger.github.io/composer/integrating/getting-started-rest-api.html

    ```
    composer-rest-server -p hlfv1 -n auction-network -i admin -s adminpwd

    or

    composer-rest-server

        ? Enter your Connection Profile Name: hlfv1
        ? Enter your Business Network name : auction-network
        ? Enter your enrollment ID : PeerAdmin
        ? Enter your enrollment secret : adminpw
        ? Specify if you want namespaces in the generated REST API: always use namespaces
        ? Specify if you want to enable authentication for the REST API using Passport: No
        ? Specify if you want to enable event publication over WebSockets: No
        ? Specify if you want to enable TLS security for the REST API: No
    ```

    This will start your REST API server at http://localhost:3000/explorer

    Use the mentioned api on server to cummunicate with blochchain network
