import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { httpGet } from '../methods/axios';
import { deleteAll } from '../methods/cookie';
import constant from '../constants';

export default class user extends Component {
    constructor() {
        super();
        this.state = {
            username: constant.nil,
            files: constant.nil
        }
    }

    componentWillMount() {
        var username, files
        httpGet("/users")
            .then(res => {
                username = res.data.username
                return httpGet("/files")
            })
            .then(res => {
                files = res.data.files
                this.setState({
                    username,
                    files
                })
            })
            .catch(err => {
                console.log(err)
                deleteAll()
            })
    }

    render() {
        return (
            <Dropzone>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                )}
            </Dropzone>
        )
    }
}
