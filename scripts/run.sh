#!/bin/bash
app=$1
serverless mono --nestApp ${app} --command offline
