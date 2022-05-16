import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class Cdk2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Get vpc name
    const defaultvpc =  ec2.Vpc.fromLookup(this, 'mainVpc', { isDefault: true })
    const defaultInstance = ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.NANO);

    // Create Security Group 
    const bastionSg = new ec2.SecurityGroup(this, 'bastionSg', {
      vpc: defaultvpc,
      allowAllOutbound: true,
      description: 'security group for a bastionHost',
      });
    // add ingress rule  
    bastionSg.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH',
    );

    // Bastionhost
    const host = new ec2.BastionHostLinux(this, 'BastionHost', {
      instanceName: 'BastionHost',
      vpc: defaultvpc,
      instanceType: defaultInstance,
      blockDevices: [{
        deviceName: 'EBSBastionHost',
        volume: ec2.BlockDeviceVolume.ebs(10, {
          encrypted: true,
        }),
      }],
    });
  }
}
