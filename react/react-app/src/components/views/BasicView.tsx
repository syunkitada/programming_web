import * as React from "react";

import { connect } from "react-redux";

import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {
    StyleRules,
    WithStyles
} from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoneIcon from "@material-ui/icons/Done";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

import actions from "../../actions";
import form_utils from "../../lib/form_utils";
import logger from "../../lib/logger";

import LineGraphCard from "../cards/LineGraphCard";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import Toolbar from '@material-ui/core/Toolbar';

import SearchForm from "../forms/SearchForm";

interface IBasicView extends WithStyles<typeof styles> {
    auth;
    getQueries;
    targets;
    routes;
    render;
    data;
    selected;
    index;
    onClose;
    isSubmitting;
    title;
    rawData;
    submitQueries;
    handleChange;
    webSocket;
    webSocketData;
}

class BasicView extends React.Component<IBasicView> {
    public state = {
        fieldMap: {}
    };

    public render() {
        const {
            classes,
            index,
            selected,
            isSubmitting,
            title,
            onClose
        } = this.props;
        logger.info("BasicView", "render", index, selected);

        const fields = this.renderFields();
        const panels = this.renderPanels();

        return (
            <div className={classes.root}>
                {title && (
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                )}
                <DialogContent>
                    {index.Description && (
                        <DialogContentText>
                            {index.Description}
                        </DialogContentText>
                    )}
                    {fields && fields.length > 0 && (
                        <Table className={classes.table}>
                            <TableBody>{fields}</TableBody>
                        </Table>
                    )}
                    {panels}
                </DialogContent>
                <DialogActions>
                    <div className={classes.wrapper} style={{ width: "100%" }}>
                        <Grid container={true}>
                            <Grid
                                container={true}
                                item={true}
                                xs={6}
                                justify="flex-start"
                            >
                                {onClose && (
                                    <Button
                                        onClick={onClose}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </Grid>
                            <Grid
                                container={true}
                                item={true}
                                xs={6}
                                justify="flex-end"
                            />
                        </Grid>
                    </div>
                </DialogActions>
            </div>
        );
    }

    private handleChange = (event, isExpanded) => {
        console.log("handleChange");
    };

    private renderFields = () => {
        const { selected, index, rawData } = this.props;
        const { fieldMap } = this.state;
        const fields: JSX.Element[] = [];

        if (selected) {
            const listItems: JSX.Element[] = [];
            for (let i = 0, len = selected.length; i < len; i++) {
                const s = selected[i];
                listItems.push(
                    <ListItem key={s}>
                        <ListItemIcon>
                            <DoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={s} />
                    </ListItem>
                );
            }

            fields.push(<List key={"selected"}>{listItems}</List>);
        }

        if (!index.Fields) {
            return fields;
        }

        for (let i = 0, len = index.Fields.length; i < len; i++) {
            const field = index.Fields[i];
            const fieldState = fieldMap[field.Name];

            let value = "";
            if (fieldState) {
                value = fieldState.value;
            } else {
                if (rawData) {
                    value = rawData[field.Name];
                }
            }

            switch (field.Kind) {
                case "text":
                    fields.push(
                        <TableRow key={field.Name}>
                            <TableCell>{field.Name}</TableCell>
                            <TableCell style={{ width: "100%" }}>
                                {value}
                            </TableCell>
                        </TableRow>
                    );
                    break;
                case "select":
                    fields.push(
                        <TableRow key={field.Name}>
                            <TableCell>{field.Name}</TableCell>
                            <TableCell style={{ width: "100%" }}>
                                {value}
                            </TableCell>
                        </TableRow>
                    );
                    break;
                default:
                    fields.push(<span>FieldNotFound</span>);
                    break;
            }
        }

        return fields;
    };

    private renderPanels = () => {
        const {
            render,
            routes,
            classes,
            index,
            rawData,
            webSocketData
        } = this.props;

        const panelsGroups: JSX.Element[] = [];
        for (let i = 0, len = index.PanelsGroups.length; i < len; i++) {
            console.log("TODO renderPanels", index, rawData);
            const panelsGroup = index.PanelsGroups[i];
            const panels: JSX.Element[] = [];
            if (panelsGroup.Kind === "Cards") {
                const cards: JSX.Element[] = [];

                for (
                    let j = 0, jlen = panelsGroup.Cards.length;
                    j < jlen;
                    j++
                ) {
                    const card = panelsGroup.Cards[j];
                    switch (card.Kind) {
                        case "Fields":
                            const fields: JSX.Element[] = [];
                            console.log("TODO renderPanels2");
                            for (
                                let x = 0, xlen = card.Fields.length;
                                x < xlen;
                                x++
                            ) {
                                const field = card.Fields[x];
                                const value = rawData[field.Name];
                                fields.push(
                                    <TableRow key={field.Name}>
                                        <TableCell>{field.Name}</TableCell>
                                        <TableCell style={{ width: "100%" }}>
                                            {value}
                                        </TableCell>
                                    </TableRow>
                                );
                            }

                            cards.push(
                                <Grid key={card.Name} item={true} xs={6}>
                                    <Table className={classes.table}>
                                        <TableBody>{fields}</TableBody>
                                    </Table>
                                </Grid>
                            );
                            console.log("TODO renderPanels3");

                            break;
                        case "Tables":
                            const tables: JSX.Element[] = [];
                            for (
                                let x = 0, xlen = card.Tables.length;
                                x < xlen;
                                x++
                            ) {
                                const table = card.Tables[x];
                                const html = render(routes, rawData, table);
                                tables.push(
                                    <div key={table.Name}>
                                        <Typography variant="subtitle1">
                                            {table.Name}
                                        </Typography>
                                        {html}
                                        <hr />
                                    </div>
                                );
                            }

                            cards.push(
                                <Grid key={card.Name} item={true} xs={6}>
                                    {tables}
                                </Grid>
                            );
                            break;
                        case "Table":
                            cards.push(
                                <Grid key={card.Name} item={true} xs={6}>
                                    <Typography variant="subtitle1">
                                        {card.Name}
                                    </Typography>
                                    {render(routes, rawData, card)}
                                </Grid>
                            );
                            break;

                        case "Console":
                            cards.push(
                                <Grid key={card.Name} item={true} xs={12}>
                                    <FormControl
                                        fullWidth={true}
                                        variant="filled"
                                    >
                                        <TextField
                                            variant="filled"
                                            onKeyUp={this.handleChangeTextForm}
                                        />
                                        <pre
                                            style={{
                                                backgroundColor: "#333",
                                                height: 500,
                                                width: "100%"
                                            }}
                                        >
                                            {webSocketData}
                                        </pre>
                                    </FormControl>
                                </Grid>
                            );

                            break;
                    }
                }

                panels.push(
                    <ExpansionPanel
                        key={panelsGroup.Name}
                        expanded={true}
                        onChange={this.handleChange}
                        className={classes.expansionPanel}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.expansionPanelSummary}
                        >
                            <Typography variant="subtitle1">
                                {panelsGroup.Name}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={classes.expansionPanelDetail}
                        >
                            <Grid container={true} spacing={2}>
                                {cards}
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            } else if (panelsGroup.Kind === "SearchForm") {
                panels.push(
                    <ExpansionPanel
                        key={panelsGroup.Name}
                        expanded={true}
                        onChange={this.handleChange}
                        className={classes.expansionPanel}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.expansionPanelSummary}
                        >
                            <Typography variant="subtitle1">
                                {panelsGroup.Name}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={classes.expansionPanelDetail}
                            style={{ padding: "20px 20px 20px 20px" }}
                        >
                            <Grid container={true} spacing={2}>
                                <SearchForm
                                    routes={routes}
                                    index={panelsGroup}
                                    data={rawData}
                                    onChange={this.handleChangeOnSearchForm}
                                    onSubmit={this.handleSubmitOnSearchForm}
                                />
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            } else if (panelsGroup.Kind === "MetricsGroups") {
                console.log("debug data", rawData[panelsGroup.DataKey]);
                const metricsGroups = rawData[panelsGroup.DataKey];
                if (!metricsGroups) {
                    continue;
                }
                for (let j = 0, jlen = metricsGroups.length; j < jlen; j++) {
                    const metricsGroup = metricsGroups[j];
                    const cards: JSX.Element[] = [];
                    for (
                        let x = 0, xlen = metricsGroup.Metrics.length;
                        x < xlen;
                        x++
                    ) {
                        const metric = metricsGroup.Metrics[x];
                        console.log("DEBUG metrics", metric);
                        cards.push(
                            <Grid key={metric.Name} item={true} xs={6}>
                                <LineGraphCard data={metric} />
                            </Grid>
                        );
                    }
                    panels.push(
                        <ExpansionPanel
                            key={panelsGroup.Name + metricsGroup.Name}
                            expanded={true}
                            onChange={this.handleChange}
                            className={classes.expansionPanel}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.expansionPanelSummary}
                            >
                                <Typography variant="subtitle1">
                                    {panelsGroup.Name} {metricsGroup.Name}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                className={classes.expansionPanelDetail}
                            >
                                <Grid container={true} spacing={2}>
                                    {cards}
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                }
            }

            panelsGroups.push(
                <div key={panelsGroup.Name} className={classes.panelsGroups}>
                    {panels}
                </div>
            );
        }

        return <div>{panelsGroups}</div>;
    };

    private handleChangeTextForm = event => {
        const { webSocket } = this.props;
        event.stopPropagation();
        let value = String.fromCharCode(event.which);
        if (event.shiftKey) {
            value = value.toUpperCase();
        } else {
            value = value.toLowerCase();
        }
        console.log(
            "TODO handleChangeTextForm",
            String.fromCharCode(event.which),
            event.which,
            value,
            webSocket
        );

        value = event.target.value;
        console.log("TODO debug key", event.which);
        // $ stty -a
        // speed 38400 baud; rows 15; columns 120; line = 0;
        // intr = ^C; quit = ^\; erase = ^?; kill = ^U; eof = ^D; eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;
        // susp = ^Z; rprnt = ^R; werase = ^W; lnext = ^V; discard = ^O; min = 1; time = 0;
        // -
        if (event.which === 13) {
            // enter // 13
            value = "\n";
        } else if (event.which === 8) {
            // backspace // 8
            value = "\b";
        } else if (event.which === 9) {
            // tab // 9
            value = "\t";
        } else if (event.which === 37) {
            // left // 27 91 68 \x1b[D
            value = "\x1b[D";
        } else if (event.which === 38) {
            // top // 27 91 65 \x1b[A
            value = "\x1b[A";
        } else if (event.which === 39) {
            // right // 27 91 67 \x1b[C
            value = "\x1b[C";
        } else if (event.which === 40) {
            // down // 27 91 66 \x1b[B
            value = "\x1b[B";
        } else if (event.which === 46) {
            // delete // 4
            value = "\x7f";
        }
        // ^C 3
        // 37 left
        // 38 up
        // 39 right
        // 40 down
        // 46 delete

        const body = JSON.stringify({
            Alt: event.altKey,
            Code: event.which,
            Ctrl: event.ctlKey,
            Name: event.target.name,
            Shift: event.shiftKey,
            Value: value
        });
        event.target.value = "";
        webSocket.send(body);
    };

    private handleChangeOnSearchForm = (event, searchQuery) => {
        console.log("TODO handleChangeOnSearchForm");
    };

    private handleSubmitOnSearchForm = (event, index, searchQueries) => {
        const { routes, rawData, getQueries } = this.props;
        if (!index.DataQueries) {
            logger.warning(
                "handlesubmitOnSearchForm",
                "skip submit because of SubmitQueries empty"
            );
            return;
        }

        const {
            newFormData,
            inputErrorMap
        }: any = form_utils.mergeDefaultInputsToFormData(
            index,
            rawData,
            searchQueries
        );
        console.log(
            "TODO DEBUG mergeDefaultInputsToFormData: ",
            inputErrorMap.length,
            newFormData,
            inputErrorMap
        );

        const route = routes[routes.length - 1];
        getQueries(route, newFormData);
    };
}

function mapStateToProps(state, ownProps) {
    const { auth, service } = state;
    const { projectName, serviceName } = service;
    let serviceState: any;
    if (projectName) {
        serviceState = service.projectServiceMap[projectName][serviceName];
    } else {
        serviceState = service.serviceMap[serviceName];
    }
    const { WebSocketMap, WebSocketDataMap } = serviceState;
    const { index } = ownProps;
    let webSocket: any;
    let webSocketData: any;
    if (index.EnableWebSocket) {
        webSocket = WebSocketMap[index.WebSocketKey];
        webSocketData = WebSocketDataMap[index.WebSocketKey];
        console.log("TODO DEBUG websocket", webSocketData);
    }

    return { auth, webSocket, webSocketData };
}

function mapDispatchToProps(dispatch, ownProps) {
    const { index } = ownProps;
    return {
        getQueries: (route, searchQueries) => {
            dispatch(
                actions.service.serviceGetQueries({
                    index,
                    location: route,
                    searchQueries
                })
            );
        }
    };
}

const styles = (theme: Theme): StyleRules =>
    createStyles({
        button: {
            margin: theme.spacing(1)
        },
        buttonFailed: {
            "&:hover": {
                backgroundColor: red[700]
            },
            backgroundColor: red[500]
        },
        buttonProgress: {
            color: green[500],
            left: "50%",
            marginLeft: -12,
            marginTop: -12,
            position: "absolute",
            top: "50%"
        },
        buttonSuccess: {
            "&:hover": {
                backgroundColor: green[700]
            },
            backgroundColor: green[500]
        },
        expansionPanel: {
            border: "1px solid rgba(0, 0, 0, .125)",
            boxShadow: "none"
        },
        expansionPanelDetail: {
            boxShadow: "none"
        },
        expansionPanelSummary: {
            borderBottom: "1px solid rgba(0, 0, 0, .125)",
            boxShadow: "none"
        },
        fabProgress: {
            color: green[500],
            left: -6,
            position: "absolute",
            top: -6,
            zIndex: 1
        },
        panelsGroups: {
            marginBottom: "5px"
        },
        root: {
            width: "100%"
        },
        wrapper: {
            margin: theme.spacing(1),
            position: "relative"
        }
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(BasicView));
