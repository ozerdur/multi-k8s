docker build -t ozerdur/multi-client:latest -t ozerdur/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t ozerdur/multi-server:latest -t ozerdur/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t ozerdur/multi-worker:latest -t ozerdur/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push ozerdur/multi-client:latest
docker push ozerdur/multi-client:$SHA
docker push ozerdur/multi-server:latest
docker push ozerdur/multi-server:$SHA
docker push ozerdur/multi-worker:latest
docker push ozerdur/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-depl server=ozerdur/multi-server:$SHA
kubectl set image deployments/client-depl client=ozerdur/client-server:$SHA
kubectl set image deployments/worker-depl worker=ozerdur/worker-server:$SHA