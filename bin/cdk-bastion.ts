#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { Cdk2Stack } from "../lib/bastion-stack";

const apAccount = { account: "xxxxxxxxxxxx", region: "ap-southeast-1" };

const app = new cdk.App();
new Cdk2Stack(app, "Cdk2Stack", {
	// use aws default account on ap-southeast-1
	env: apAccount,
});
