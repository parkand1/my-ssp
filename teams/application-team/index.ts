import { ArnPrincipal } from '@aws-cdk/aws-iam';
import { ApplicationTeam } from '@aws-quickstart/ssp-amazon-eks';


export class TeamApplication extends ApplicationTeam {
    constructor(name: string) {
        super({
            name: name,
            userRoleArn: `arn:aws:iam::059886156858:role/application-team`,  
            users: [new ArnPrincipal('arn:aws:iam::059886156858:user/Admin')]
        });
    }
}