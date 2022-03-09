import * as cdk from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';

export default class PipelineConstruct extends cdk.Construct{
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps){
    super(scope,id)

    const blueprint = ssp.EksBlueprint.builder()
    .account(props?.env?.account)
    .region(props?.env?.region)
    .addOns()
    .teams();
  
    ssp.CodePipelineStack.builder()
      .name("ssp-eks-workshop-pipeline")
      .owner("parkand1")
      .repository({
          repoUrl: 'my-ssp',
          credentialsSecretName: 'github-token',
          targetRevision: 'main'
      })
      .build(scope, id+'-stack', props);
  }
}