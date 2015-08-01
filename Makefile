serve:
	npm run dev

build:
	docker build -t $(USER)/1rt .

# Run `make build` before this. It's too much to run every time.
dockerserve:
	docker run -p 80:8080 -p 443:8443 -d $(USER)/1rt
	boot2docker ip

# See DEPLOYING.md for explanations of the below steps.
deploy: build
	docker tag -f $(USER)/1rt b.gcr.io/ka_container_registry/1rt
	gcloud docker push b.gcr.io/ka_container_registry/1rt
	gcloud compute instances delete hackathon-1rt \
	  --delete-disks=all \
	  --quiet \
	  --zone us-central1-a
	gcloud compute instances create hackathon-1rt \
	  --image container-vm \
	  --zone us-central1-a \
	  --machine-type f1-micro \
	  --tags http-server,https-server \
	  --address hackathon-1rt \
	  --metadata-from-file google-container-manifest=containers.yaml
