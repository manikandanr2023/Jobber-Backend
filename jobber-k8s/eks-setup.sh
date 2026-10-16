
eksctl create cluster --name=jobberapp  --region=ap-southeast-2 --vpc-private-subnets=subnet-001606dc5f992804d,subnet-05c8d34af0ddbd2f0--without-nodegroup



eksctl create cluster --name=jobberapp --region=ap-southeast-2 --vpc-private-subnets=subnet-001606dc5f992804d,subnet-05c8d34af0ddbd2f0 --without-nodegroup


eksctl utils associate-iam-oidc-provider --region=ap-southeast-2 --cluster=jobberapp --approve


eksctl create nodegroup --cluster=jobberapp --region=ap-southeast-2 --name=jobberapp-node --subnet-ids=subnet-001606dc5f992804d,subnet-05c8d34af0ddbd2f0 --node-type=t3.micro --nodes=4 --nodes-min=4 --nodes-max=6 --node-volume-size=20 --ssh-access --ssh-public-key=jobber-kube --managed --asg-access --external-dns-access --full-ecr-access --appmesh-access --alb-ingress-access --node-private-networking

