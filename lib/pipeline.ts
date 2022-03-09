import * as cdk from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
import { TeamPlatform, TeamApplication } from '../teams'; // HERE WE IMPORT TEAMS

export default class PipelineConstruct {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    // super(scope,id);

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
      // WE ADD THE STAGES IN WAVE FROM THE PREVIOUS CODE
      .wave({
        id: "envs",
        stages: [
          { id: "dev", stackBuilder: blueprint.clone('us-west-2')},
          { id: "test", stackBuilder: blueprint.clone('us-east-2')},
          { id: "prod", stackBuilder: blueprint.clone('us-east-1')}
        ]
      })
      .build(scope, id+'-stack', props);
  }
}