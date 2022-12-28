# ece-devops-postic-beriot

## Overview

### API & Continuous Testing

- Installez Node.js avec n-install

```bash
sudo apt update
sudo apt install build-essential git curl
curl -L https://git.io/n-install | bash
```

- Initialiser un paquet Node.js dans le dossier userapi en exécutant cette commande :

```bash
npm init -y
```

- Installez la base de données Redis

  - Instructions:
    - **Windows:** <https://redis.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/>
    - **MacOS:** `brew install redis` or <https://redis.io/topics/quickstart>
    - **Linux or MacOS:** <https://redis.io/topics/quickstart>

- Après l'insallation, démarrez Redis avant l'application Node.js

- **Windows:** Ouvrez le fichier `redis-server.exe`
- **MacOS and Linux:** `redis-server`

- Exécutez NPM script with the command to start the API:
- Exécutez NPM script pour lancer l'API avec la commande suivante:

```bash
npm run start
# or
npm start
```

- Run tests:

```bash
npm test
```

L'API est une application Web qui affiche "Hello World" lorsqu'elle est accédée sur localhost à partir du port 3000. L'URL /user/:username permet de rechercher le nom d'utilisateur correspondant dans la base de données.

Pour que les tests de l'API fonctionnent correctement, il est nécessaire que Redis soit en cours d'exécution en parallèle.

L'API est également fournie avec des scripts de test qui garantissent le bon fonctionnement de ses fonctionnalités.

### Github Actions & Heroku

GitHub Actions est utilisé pour automatiquement exécuter le script de test chaque fois qu'un nouveau commit est effectué sur le projet, afin de s'assurer que l'API continue de fonctionner correctement malgré les modifications apportées. De cette façon, il n'est pas nécessaire d'exécuter manuellement le script de test à chaque fois.

En outre, l'API est déployée en tant que service sur la plateforme Heroku grâce à GitHub Actions.

### Vagrant

1. Install VirtualBox - <https://www.virtualbox.org/wiki/Downloads>.
2. Install Vagrant on your computer - <https://www.vagrantup.com/downloads.html>.
3. (Optional) **On Windows**, ensure that Hyper-V is disabled:

- Ouvrez un nouveau PowerShell.
  -Exécutez la commande suivante:

  ```bash
  Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
  ```

- Téléchargez la Vagrant box `centos/7` pour le **Virtualbox provider**, éxécutez:

```bash
vagrant box add centos/7
```

Cela affichera:

```bash
==> box: Loading metadata for box 'centos/7'
   box: URL: https://vagrantcloud.com/centos/7

1) hyperv
2) libvirt
3) virtualbox
4) vmware_desktop

Enter your choice: 3
```

- Allez dans le répertoire iac et entrez la commande suivante :

```bash
vagrant up
```

- Pour entrer dans la VM via SSH :

```bash
vagrant ssh
```

En ouvrant une session dans la VM, vous aurez accès à une interface de commande bash dans la VM Linux, vous permettant d'exécuter n'importe quelle commande

- Ouvrez VirtualBox (ou VMware) et vérifiez la machine virtuelle installée.

### Docker

- Install [Docker Desktop](https://www.docker.com/get-started) en suivant les instructions en fonction de votre OS.

- Allez dans le répertoire userapi

#### Sans Docker Compose

- Extraire une image docker de Redis

```bash
docker pull redis
```

#### Avec Docker Compose

- Démarrez les conteneurs avec la commande suivante :

```bash
docker-compose up

```

- Exécuter le conteneur docker de redis

```bash
docker run -p 6379:6379 --name <custom-image-name> redis
```

- Construisez une image Docker basée sur le Dockerfile

```bash
docker build -t <custom-image-name> .
```

- Exécuter le conteneur docker

```bash
docker run -p <PORT_1>:3000 <custom-image-name>
```

Vous pouvez maintenant accéder à l'API via localhost sur le port <PORT_1>.

### Kubernetes

1. Installez **BETA VERSION** de Minikube

[Install Minikube](https://minikube.sigs.k8s.io/docs/start/) en suivant les instructions en fonction de votre système d'exploitation. Il y a un bugfix utile dans la version BETA donc choisissez-la.

- S'assurer que Hyper-V est activé sur Windows avec la commande Powershell
  `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All` (cliquez avec le bouton droit de la souris sur l'icône powershell et sélectionnez "Exécuter en tant qu'administrateur" dans les options de lancement).
- Définissez hyperv comme le moteur d'exécution de votre conteneur minikube avec`minikube config set driver hyperv`
- Démarrer Minikube avec :

```bash
minikube start --driver=docker
```

- Une fois qu'il a démarré, exécutez la commande suivante dans le répertoire k8s/development/ :

```bash
kubectl apply -f deployment.yaml
```

- Maintenant, allez dans le répertoire k8s/development/service et exécutez la commande suivante pour exposer le port d'écoute API du pod Kubernetes :

```bash
kubectl apply -f service.yaml
```

Kubernetes est utilisé pour gérer les déploiements de pods contenant un ou plusieurs conteneurs qui sont essentiellement similaires ou identiques aux images Docker, ce qui signifie que l'on peut désormais faire évoluer le nombre d'images déployées comme on le souhaite (en fonction du nombre d'utilisateurs dans la plupart des cas) et que celles-ci sont automatiquement remplacées en cas de défaillance, ce qui permet de maintenir le service à tout prix.

## Contributors

Yoann POSTIC
Maxime BERIOT
