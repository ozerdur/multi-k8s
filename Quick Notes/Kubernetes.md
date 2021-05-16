# Kubernetes

<b>What</b>
: Sytem for running many different containers over multiple different machines, a system to deploy containerized apps

<br>
<b>Why</b>: When you need to run many diffrent containers with different images

- Expects all images to already be built
- One config gile per object we want to create
- We have to manually set up all networking

## Cluster

Nodes + Master form a 'Cluster'

## Master

- are machines(or vm's) with a set of programs to manages nodes
- works according to given yaml files
- Controls what each <b>Node</b> does

## Node

Virtual Machine or Physical Computer that run containers

- Can Contain multi containers

### Deployment

Controls Pods

### Pod

Smallest item we can deploy
Runs one or more closely related containers
Contains one or more container(grouping containers which are tightly coupled, like postgres,
logger, backup-maanger containers)

### Service

Sets up networking in a Kubernetes Cluster

- ClusterIP

  - Exposes a set of pods to other object in the cluster

- NodePort
  - Exposes a container to the outside world(only good for dev purposes)
    - port: cluster port
    - targetPort: container port
    - nodePort: Outside port (if not set random 30000-32767)
- LoadBalancer
  - Legacy way of getting network traffic into a cluster (OUTDATED)
- Ingress
  - Exposes a set of services to the outside world

## Minikube

A program that enables us to create a single node kubernetes cluster in development environment

## Managed Solution in Production

AWS has EKS(Amazon Elastic Container Service for Kubernetes)

Google has GKE(Google Cloud Kubernetes Engine) for production

# Commands

## kubectl get pods

Lists pods

## kubectl get deployments

Lists deployments

## kubectl get services

Lists services

## kubectl get namespaces

Lists namespaces

## kubectl apply -f \<yaml file>

- Applies yaml config.
- Create objects.
- If created objecs manually deleted, they are automatically recreated by master

## kubectl delete -f \<yaml file>

Removes objects created by yaml file. if these objecs manually deleted, they are automatically recreated by master

## kubectl port-forward \<pod name> \<clusterPort></clusterPort>:\<containerPort>

Opens a nodePort with cmd

## kubectl describe \<object type> \<objectname>

Lists details of the object

Ex: kubectl describe pod client-pod

## kubectl set image \<object_type>/\<object_name> \<container_name>=\<new image to use>

Imperative cmd to update image

## Pod Config

- Runs a single set of containers
- Good for one-off dev purposes
- Rarely used directly in production

- Updates

  Can update:

  - image

  Can not update fields:

  - name
  - port
  - containers

## Deployment Config

- Runs a set of identical pods(one or more)
- Monitors the state of each pod, updating as necessary
- Good for dev and production

  Can update:

  - image
  - name
  - port
  - containers

## Volume in generic container terminology

Some type of mechanism that allows a container to access a filesystem outside itself

## Volume in Kubernetes

An <b>object</b> that allows a container to store data at the pod level

persist data after <b>container</b> delete/create(deleted when pod is deleted so not appropriate)

## Persistent Volume

Used to persist data after <b>pod</b> delete/create

## Persistent Volume Claim (PVC)

Used to persist data after <b>pod</b> delete/create

- just an item in billboard(claim)

  Billboard (pod config)->computer store (statically provisioned PVs->factory(dynamically provisioned PVs)

  Config

  - Access Modes
    - ReadWriteOnce
      - Can be used by a single node
    - ReadOnlyMany
      - Multiple nodes can read from this
    - ReadWriteMany
      - Multiple nodes can read and write

## kubectl get pv

Lists persistent volume (allocated)

## kubectl get pvc

Lists persistent volume claims (just the menu)

## kubectl get storageclass

list storageclasses(in local default but many options exist in cloud(Google Cloud Persistent Disk, Azure File, Azure Disk, AWS Block Store etc.))

## kubectl create secret generic \<secret_name> --from-literal=\<secret_key>=\<secret \*
