import React, {useEffect, useState} from "react";
import useSWR from "swr";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const endpoint =  "http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
});

export default function Detail(props) {
    const classes = useStyles();
    const { data, error} =useSWR(endpoint)

    return data && data.nodes.map(item => {
        if(item.id == props.location.state.id ) {
            return (
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Detail
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.id}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.acceptedTradeQuantity}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.accountType}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.displayName}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.price}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.quantity}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.role}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.tradeDate}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {item.volume}
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
    })
    }
