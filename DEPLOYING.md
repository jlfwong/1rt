Run `make deploy` or read on for the details of what it does.

### Deploy to production on Google Compute Engine

 1. Build the docker image

        docker build -t $USER/1rt .

 2. Push the image to Google Container Registry. See [https://cloud.google.com/container-registry/#before\_you\_begin](https://cloud.google.com/container-registry/#before_you_begin). These commands relied on a Google Cloud Storage bucket.

        docker tag -f $USER/1rt b.gcr.io/ka_container_registry/1rt
        gcloud docker push b.gcr.io/ka_container_registry/1rt

 3. (Optional) Delete a prior VM instance with the same name.

        gcloud compute instances delete hackathon-1rt --delete-disks=all

 4. Create a Compute Engine VM that'll create the above container right away. Make sure the image: value in containers.yaml matches the full image path above (e.g., b.gcr.io/.../1rt).

        gcloud compute instances create hackathon-1rt \
          --image container-vm \
          --zone us-central1-a \
          --machine-type f1-micro \
          --tags http-server \
          --address hackathon-1rt \
          --metadata-from-file google-container-manifest=containers.yaml

 5. (Optional) SSH in to the VM and make sure the container is created.

        gcloud compute ssh --zone us-central1-a hackathon-1rt
        # And once on the VM...
        sudo docker ps

 6. Find the external IP of the VM and pay it a visit in the ol' browser.

        gcloud compute instances list

